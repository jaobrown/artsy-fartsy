// functions to write (maybe an API end point and an admin dashboard? idk, we'll see)

const cloudinaryCleanUp = () => {
  // get all sessions
  //
  // create array of images being referenced in sessions
  //
  // get all cloudinary asset ids
  //
  // create array of all cloudinary ids
  //
  // filter cloudinary IDs that do not appear in Fauna
  //
  // delete cloudinary assets that are not being used
  //
};

//! Mini "todo" list
//
//? Refactoring 🤷‍♀️
// todo: Refactor `/new` to useReducer
// todo: Refactor form component to useFieldArray with reset() + useReducer
// todo: Refactor to smaller / compound components
//
//? Features 🏕
// todo: Write tests for existing features after refactor
// todo: UX feedback for uploads
// todo: Edit page
// todo: Drag and reorder form inputs
// todo: Delete image inputs while editing a session
// todo: Browser image compression prior to upload
// todo: Clean up functions
// todo: Auth + tie sessions and images to users
// todo: File storage limits per account (could be set via max # of images, if file max size is set during image compressoion - just do some basic math here)
// todo: Draggable/collapsable timer component
// todo: Shareable links of sessions
//
