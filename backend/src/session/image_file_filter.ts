const ALLOWED_IMAGE_TYPES = ['image/png', 'image/jpeg'];

export const pngFileFilter = function fileFilter(req, file, cb) {
  const isOk = ALLOWED_IMAGE_TYPES.includes(file.mimetype);
  cb(null, isOk);
};
