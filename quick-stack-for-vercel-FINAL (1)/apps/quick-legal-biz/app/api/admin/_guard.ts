function isAuthorized(req: Request) {
  const token = req.headers.get("x-admin-token");
  return token && token === process.env.ADMIN_TOKEN;
}
export { isAuthorized };
