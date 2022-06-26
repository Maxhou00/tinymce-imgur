# tinymce-imgur [![npm](https://img.shields.io/npm/v/tinymce-imgur.svg)](https://www.npmjs.com/package/tinymce-imgur) [![license](https://img.shields.io/npm/l/tinymce-imgur.svg)](LICENSE.md)

Plugin for using imgur as a image uploader for Tinymce WYSIWYG Editor

## Prerequisites

The following must be available for this plugin to work properly:

- Tinymce Editor >= 6.0 (developed under 6.0.0)
- A ClientID from the [imgur API](https://apidocs.imgur.com/)

## Installing

Add `tinymce-imgur` to your package.json:

```bash
npm install --save tinymce-imgur
# or
yarn add tinymce-imgur
```

In your Tinymce init configuration :

- Load tinymce-imgur on your page or import it

```html
<script src="/node_modules/tinymce-imgur/build/tinymce_imgur.min.js"></script>
```

Or

```javascript
import tinymce from "tinymce/tinymce";
import "tinymce-imgur";
```

- Add `tinymceImgur` path to the `external_plugins` option
- Add `tinymceImgur_client_id` with your imgur's API id
- Add `tinymceImgur` anywhere on your toolbar.

```javascript
tinymce.init({
  selector: "textarea", // change this value according to your HTML
  external_plugins: {
    tinymceImgur: "/node_modules/tinymce-imgur/build/tinymce_imgur.min.js",
  },
  tinymceImgur_client_id: "Your Imgur Api Client ID",
  toolbar: "tinymceImgur",
});
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
