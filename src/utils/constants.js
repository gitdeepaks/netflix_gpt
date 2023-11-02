export const LOGO = "https://www.freepnglogos.com/uploads/netflix-logo-0.png";

export const USER_AVATAR =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAMAAAAL34HQAAAAllBMVEVmjD////////3///peiDddhS1iijtZhS9TgSdahjJYgBlcgiD///dVgyv6+fNHeQDq7NqZqXLX3cFRgB6Cm1jIzan//vL09ebd3cFoijpwkEKyvI3e4cz++evo5c9+mE9yjzePpGast4HL0bJ4lVHV2caxvJXt7+WktYq/xaTe5dWhsoKDlky/xp+hrXBmhyuPoFOdq2X9n98PAAADGUlEQVR4nO3aa3OiMBQGYBOSAAI2gCiCN6RbWy1q//+fW7DeYDsuYeL6Yd/nU2faxJNwgplz2usBAAAAAAAAAAAAAAAAAMB/Spih4/Qt8YCZmdV3HIt1mZoPIzlyx7E/0R0YS9LpbDabpwtbdajoR2Ny5M6XyqPv8jL5PTNZ+5bq4OlpKDHIINMZF1sRep6bRFxpbJhfxlJKZlzfc2TZ4BoWJStTaezNisr9ytUWdY8zJrfGrwor5r9uw6JkPdS1XfUFlz+/tU8Q8bomde9MU1g8b4Q1b5/1onz+dR8qKXB36k09LOq+tB/rG42wck9TWMmG3oZVxqgQ1uN2i20aM4/C9mE1couSrbbcihphxQpv1PIk1gx0nsT6ghVOYo99kpsUoKTQ994K5c3UlMhEZcFWToxrXAON39blW56eD1T5ETu17DjmwCkwudB5h/Cq80SPiJsqflcLXrjnpEx05fs305enJY989ZnNfTqVcpon2i+CLNwFUm6CndPpImjzZbLXeHm4Yt5+suR6HwIAAAAAAAAAPJ/oVIN4MGEtdgflpk8rzO5a32B8OK9K2BOt8RwJJyt8p0sRmoWf06r3Q+mbrhr2NapJ1b+ZFYnqzGZSVd6qUiWlbvsCeEs8PxUx0xezfe4yz1lJ41oCbd8uaEcML9V7Nxq2K6KxcqNuK/NUqS7fOqxLNXoQZI53/7wLZjmHSNb7NrHWcvER/6h9gptvX7n586YJ21sOt/mo3oUgchvqf3MJHtc7EmQ9LXZLJ7Q8m53Zthn2l4c0kAPS6Nm5RU9vF/zMOkhKmkabOCpWK7+yWqVFNJ/98Ue0OiidXi2tsMSvNXmpcWpRGMd+wLkTQv+IS74nj9mpc2D9r2mzzfc36+jw8vCvQzbJ8ln7mIy4PBn/pCQvvP4uWBs/PazL0z3+xh3nq323f2LphnmLLJo3e8k1o7jIFvyhGfUDIexw/1UEcj2oR2cM1jIodpO+ZYsn3a+YySeLzH9PoygOgiAq0nTrZ4sJ5/azb3xCCGabplXy7PK9Kp61RwAAAAAAAAAAAACd/AaGKCpmtgrivwAAAABJRU5ErkJggg==";

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer" + process.env.REACT_APP_TMDB_API_KEY,
  },
};

export const IMG_CDN = "https://image.tmdb.org/t/p/w500";

export const BG_URL =
  "https://assets.nflxext.com/ffe/siteui/vlv3/a73c4363-1dcd-4719-b3b1-3725418fd91d/fe1147dd-78be-44aa-a0e5-2d2994305a13/IN-en-20231016-popsignuptwoweeks-perspective_alpha_website_large.jpg";

export const Supportedlanguages = [
  {
    identifier: "en",
    name: "English",
  },
  {
    identifier: "hindi",
    name: "Hindi",
  },
  {
    identifier: "spanish",
    name: "Spanish",
  },
];

export const OPEN_AI_API_KEY = process.env.REACT_APP_OPEN_AI_API_KEY;
