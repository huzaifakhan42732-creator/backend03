const asyncHandler = (fn) =>
    { (req, res, next) => {
    Promise.resolve(fn(req, res, next)).
    catch(err => next(err))
}
}
export default asyncHandler;



// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next);
//     } catch (err) {
//        res.status(500).json({ message: err.message,
//         success: false });
//     }}