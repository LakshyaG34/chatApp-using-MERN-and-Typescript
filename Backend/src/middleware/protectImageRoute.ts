import multer from "multer"

const storage = multer.memoryStorage(); // stores image in memory as Buffer
export const upload = multer({ storage });