import { GetServerSidePropsContext } from "next";
/**
 * Retuns a "users" remote data to be used for authentication.
 */
const getRemoteUser = (req: GetServerSidePropsContext["req"]) => {
  const ip = req.socket.remoteAddress;
  const remoteFamily = req.socket.remoteFamily;
  const remotePort = req.socket.remotePort;

  return `${remoteFamily}${ip}:${remotePort}`;
};

export { getRemoteUser };
