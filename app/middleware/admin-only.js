export default defineNuxtRouteMiddleware((to, from) => {
  const user = useCookie('user').value

  // Log this so you can check your Browser Console (F12)
  console.log("Middleware user check:", user)

  // 1. Check if user exists
  // 2. Check if role is 'Admin' (Match your Backend exactly!)
  if (!user || user.role !== 'Admin') {
    console.warn("Access Denied: User role is", user?.role)
    return navigateTo('/') 
  }
})