import config from "../../../appconfig.json";

export const env = (key) => {
  return config[process.env.NODE_ENV][key];
}
