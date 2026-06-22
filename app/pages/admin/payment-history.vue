<template>
  <div class="payment-history">
    <div class="page-header">
      <h1>Payment History</h1>
      <p>View and manage all student textbook payments</p>
    </div>

    <!-- Stats Cards -->
    <div class="stats-row">
      <div class="stat-card">
        <span class="stat-label">Total Payments</span>
        <span class="stat-value">{{ payments.length }}</span>
      </div>
      <div class="stat-card">
        <span class="stat-label">Total Revenue</span>
        <span class="stat-value">₦{{ totalRevenue.toLocaleString() }}</span>
      </div>
      <div class="stat-card">
        <span class="stat-label">Selected</span>
        <span class="stat-value">{{ selectedIds.length }}</span>
      </div>
    </div>

    <!-- Filters -->
    <div class="filters">
      <div class="filter-group">
        <button
          v-for="filter in quickFilters"
          :key="filter.value"
          class="filter-btn"
          :class="{ active: activeFilter === filter.value }"
          @click="applyQuickFilter(filter.value)"
        >
          {{ filter.label }}
        </button>
      </div>

      <div class="date-range">
        <input
          type="date"
          v-model="fromDate"
          class="date-input"
          placeholder="From"
        />
        <span>to</span>
        <input
          type="date"
          v-model="toDate"
          class="date-input"
          placeholder="To"
        />
        <button class="filter-btn active" @click="applyDateRange">Apply</button>
      </div>
    </div>

    <!-- Actions Bar -->
    <div class="actions-bar" v-if="selectedIds.length > 0">
      <span>{{ selectedIds.length }} selected</span>
      <button class="delete-btn" @click="confirmDelete">
        🗑 Delete Selected
      </button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="loading">Loading payments...</div>

    <!-- Error -->
    <div v-else-if="error" class="error">{{ error }}</div>

    <!-- Empty -->
    <div v-else-if="payments.length === 0" class="empty">
      No payments found for this period.
    </div>

    <!-- Table -->
    <div v-else class="table-wrapper">
      <table class="payments-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                @change="toggleSelectAll"
                :checked="allSelected"
              />
            </th>
            <th>#</th>
            <th>Name</th>
            <th>Matric No</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Amount</th>
            <th>Reference</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(payment, index) in payments"
            :key="payment.id"
            :class="{ selected: selectedIds.includes(payment.id) }"
          >
            <td>
              <input
                type="checkbox"
                :value="payment.id"
                v-model="selectedIds"
              />
            </td>
            <td>{{ index + 1 }}</td>
            <td>{{ payment.fullName }}</td>
            <td>{{ payment.matricNo }}</td>
            <td>{{ payment.email }}</td>
            <td>{{ payment.phone }}</td>
            <td>₦{{ payment.totalAmount?.toLocaleString() }}</td>
            <td class="ref">{{ payment.reference }}</td>
            <td>
              <span class="status-badge" :class="payment.status">
                {{ payment.status }}
              </span>
            </td>
            <td>{{ formatDate(payment.paidAt) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Confirm Delete Modal -->
    <div v-if="showConfirm" class="confirm-overlay" @click.self="showConfirm = false">
      <div class="confirm-box">
        <h3>Delete Payments?</h3>
        <p>Are you sure you want to delete {{ selectedIds.length }} payment(s)? This cannot be undone.</p>
        <div class="confirm-actions">
          <button class="cancel-btn" @click="showConfirm = false">Cancel</button>
          <button class="confirm-delete-btn" @click="deleteSelected" :disabled="deleting">
            {{ deleting ? 'Deleting...' : 'Yes, Delete' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

definePageMeta({
  middleware: 'admin-only'  // ✅ Only admins can access
})

const config = useRuntimeConfig()
const payments = ref([])
const loading = ref(false)
const error = ref(null)
const selectedIds = ref([])
const showConfirm = ref(false)
const deleting = ref(false)
const activeFilter = ref('all')
const fromDate = ref('')
const toDate = ref('')

const quickFilters = [
  { label: 'All', value: 'all' },
  { label: 'Last 7 Days', value: '7days' },
  { label: 'Last 30 Days', value: '30days' }
]

// ✅ Get admin token from cookie
const getAuthHeader = () => {
  const token = useCookie('token')
  return { Authorization: `Bearer ${token.value}` }
}

// ✅ Total revenue
const totalRevenue = computed(() =>
  payments.value.reduce((sum, p) => sum + (p.totalAmount || 0), 0)
)

// ✅ Check if all selected
const allSelected = computed(() =>
  payments.value.length > 0 &&
  selectedIds.value.length === payments.value.length
)

// ✅ Toggle select all
const toggleSelectAll = (e) => {
  if (e.target.checked) {
    selectedIds.value = payments.value.map(p => p.id)
  } else {
    selectedIds.value = []
  }
}

// ✅ Format date
const formatDate = (dateStr) => {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-NG', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// ✅ Fetch all payments
const fetchPayments = async (url) => {
  loading.value = true
  error.value = null
  try {
    const data = await $fetch(url, {
      headers: getAuthHeader(),
      credentials: 'include'
    })
    payments.value = data
    selectedIds.value = []
  } catch (err) {
    error.value = err.userMessage || 'Failed to load payments'
  } finally {
    loading.value = false
  }
}

// ✅ Quick filters
const applyQuickFilter = (filter) => {
  activeFilter.value = filter
  const base = `${config.public.apiUrl}/api/v1/admin/payments`
  if (filter === 'all') fetchPayments(`${base}`)
  else if (filter === '7days') fetchPayments(`${base}/last7days`)
  else if (filter === '30days') fetchPayments(`${base}/last30days`)
}

// ✅ Date range filter
const applyDateRange = () => {
  if (!fromDate.value || !toDate.value) {
    alert('Please select both from and to dates')
    return
  }
  activeFilter.value = 'custom'
  const base = `${config.public.apiUrl}/api/v1/admin/payments`
  fetchPayments(`${base}/filter?from=${fromDate.value}&to=${toDate.value}`)
}

// ✅ Confirm delete
const confirmDelete = () => {
  showConfirm.value = true
}

// ✅ Delete selected payments
const deleteSelected = async () => {
  deleting.value = true
  try {
    await $fetch(`${config.public.apiUrl}/api/v1/admin/payments/delete`, {
      method: 'DELETE',
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: { ids: selectedIds.value }
    })
    // Remove deleted from list
    payments.value = payments.value.filter(p => !selectedIds.value.includes(p.id))
    selectedIds.value = []
    showConfirm.value = false
  } catch (err) {
    alert(err.userMessage || 'Failed to delete payments')
  } finally {
    deleting.value = false
  }
}

onMounted(() => {
  fetchPayments(`${config.public.apiUrl}/api/v1/admin/payments`)
})
</script>

<style scoped>
.payment-history {
  padding: 40px 24px 24px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Montserrat', sans-serif;
}

.page-header {
  margin-bottom: 24px;
}

.page-header h1 {
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.page-header p {
  font-size: 14px;
  color: #666;
  margin-top: 4px;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.stat-label {
  font-size: 12px;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-value {
  font-size: 22px;
  font-weight: 600;
  color: #007BFF;
}

.filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 14px 16px;
}

.filter-group {
  display: flex;
  gap: 8px;
}

.date-range {
  display: flex;
  align-items: center;
  gap: 8px;
}

.date-range span {
  font-size: 13px;
  color: #666;
}

.date-input {
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  padding: 6px 10px;
  font-size: 13px;
  outline: none;
}

.date-input:focus {
  border-color: #007BFF;
}

.filter-btn {
  padding: 6px 14px;
  border-radius: 4px;
  border: 1px solid #e5e7eb;
  background: white;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn:hover {
  border-color: #007BFF;
  color: #007BFF;
}

.filter-btn.active {
  background: #007BFF;
  color: white;
  border-color: #007BFF;
}

.actions-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff3cd;
  border: 1px solid #ffc107;
  border-radius: 8px;
  padding: 10px 16px;
  margin-bottom: 16px;
  font-size: 14px;
}

.delete-btn {
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 7px 14px;
  cursor: pointer;
  font-size: 13px;
}

.delete-btn:hover {
  background: #bb2d3b;
}

.loading {
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 14px;
}

.error {
  text-align: center;
  padding: 40px;
  color: #dc3545;
  font-size: 14px;
}

.empty {
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 14px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.table-wrapper {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow-x: auto;
}

.payments-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.payments-table th {
  background: #f8f9fa;
  padding: 12px 14px;
  text-align: left;
  font-weight: 600;
  color: #444;
  border-bottom: 1px solid #e5e7eb;
  white-space: nowrap;
}

.payments-table td {
  padding: 12px 14px;
  border-bottom: 1px solid #f0f0f0;
  color: #333;
  vertical-align: middle;
}

.payments-table tr:last-child td {
  border-bottom: none;
}

.payments-table tr:hover {
  background: #f8f9fa;
}

.payments-table tr.selected {
  background: #e8f0fe;
}

.ref {
  font-family: monospace;
  font-size: 12px;
  color: #666;
}

.status-badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
}

.status-badge.success {
  background: #d1fae5;
  color: #065f46;
}

.status-badge.pending {
  background: #fef3c7;
  color: #92400e;
}

.status-badge.failed {
  background: #fee2e2;
  color: #991b1b;
}

.confirm-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.confirm-box {
  background: white;
  border-radius: 10px;
  padding: 28px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.confirm-box h3 {
  margin: 0 0 10px;
  font-size: 18px;
  color: #1a1a1a;
}

.confirm-box p {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}

.confirm-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.cancel-btn {
  padding: 8px 18px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  font-size: 14px;
}

.confirm-delete-btn {
  padding: 8px 18px;
  border: none;
  border-radius: 4px;
  background: #dc3545;
  color: white;
  cursor: pointer;
  font-size: 14px;
}

.confirm-delete-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .payment-history {
    padding: 40px 16px 16px;
  }

  .stats-row {
    grid-template-columns: 1fr;
  }

  .filters {
    flex-direction: column;
    align-items: flex-start;
  }

  .date-range {
    flex-wrap: wrap;
  }
}
</style>