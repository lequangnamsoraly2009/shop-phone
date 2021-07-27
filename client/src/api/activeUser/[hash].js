const API = require("../axiosClient");

export default async function activateUser(req, res) {
  const hash = req.query.hash;
  if (!hash) {
    return res.status(401).json({ message: "Cannot Validate an User!" });
  }

  const response = await API.get(`/users/activate/${hash}`);
  if (response.status >= 400) {
    return res.status(401).json({ message: "Cannot Validate an User!" });
  } else {
    res.writeHead(307, { Location: "/buyer/activated" });
    res.end();
  }
}
