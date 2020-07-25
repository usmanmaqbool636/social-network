import Editor from 'react-quill';
import React from 'react';
import 'react-quill/dist/quill.snow.css';

class MyComponent extends React.Component {
    state = {
        text: ''
    }

    // constructor(props) {
    //   super(props)
    //   this.state = { text: '' } // You can also pass a Quill Delta here
    //   this.handleChange = this.handleChange.bind(this)
    // }

    handleChange = (value) => {
        this.setState({ text: value })
    }

    render() {
        Editor.modules = {
            toolbar: [
                [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                [{ size: [] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' },
                { 'indent': '-1' }, { 'indent': '+1' }],
                ['clean']
            ],
            clipboard: {
                // toggle to add extra line breaks when pasting HTML:
                matchVisual: false,
            }
        }
        /* 
         * Quill editor formats
         * See https://quilljs.com/docs/formats/
         */
        Editor.formats = [
            'header', 'font', 'size',
            'bold', 'italic', 'underline', 'strike', 'blockquote',
            'list', 'bullet', 'indent',
            'link'
        ]

        return (
            <Editor
                value={this.props.value}
                name={this.props.name}
                onChange={this.props.onChange}
                modules={Editor.modules}
                formats={Editor.formats}
                theme="snow"
                placeholder="write something"
            />
        )
    }
}
export default MyComponent;