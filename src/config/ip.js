const allowedIPs = [
  "74.220.48.", // /24 means .0 - .255
  "74.220.56.",
];

export function ipFilter(req, res, next) {
  const clientIP =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  if (allowedIPs.some((ip) => clientIP.startsWith(ip))) {
    return next();
  }

  return res.status(403).send("Access denied: IP not allowed");
}

