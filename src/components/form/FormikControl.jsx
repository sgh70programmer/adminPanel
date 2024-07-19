import React from 'react';
import File from './File';
import Input from './Input';
import Select from './Select';
import NewSelect from './NewSelect';
import Switch from './Switch';
import Textarea from './Textarea';
import MultiSelect from './MultiSelect';
import SearchableSelect from './SearchableSelect';
import Ckeditor from './Ckeditor';

const FormikControl = (props) => {
    switch (props.control) {
        case 'select':
            return <Select {...props} />
        case 'newselect':
            return <NewSelect {...props} />
        case 'multiSelect':
            return <MultiSelect {...props} />
        case 'searchableSelect':
            return <SearchableSelect {...props} />
        case 'input':
            return <Input {...props} />
        case 'textarea':
            return <Textarea {...props} />
        case 'file':
            return <File {...props} />
        case 'switch':
            return <Switch {...props} />
        case 'ckeditor':
            return <Ckeditor {...props} />
        default:
            return null
    }
}

export default FormikControl;