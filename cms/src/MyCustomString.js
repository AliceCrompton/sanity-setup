// /src/MyCustomString.js

import React from "react";

import { FormField } from "@sanity/base/components";
import { TextInput, Stack, Text } from "@sanity/ui";
import PatchEvent, { set, unset } from "@sanity/form-builder/PatchEvent";
import { useId } from "@reach/auto-id"; // hook to generate unique IDs

const MyCustomString = React.forwardRef((props, ref) => {
  //define props
  const {
    type, // Schema information
    value, // Current field value
    readOnly, // Boolean if field is not editable
    placeholder, // Placeholder text from the schema
    markers, // Markers including validation rules
    presence, // Presence information for collaborative avatars
    compareValue, // Value to check for "edited" functionality
    onFocus, // Method to handle focus state
    onBlur, // Method to handle blur state
    onChange,
  } = props;

  const inputId = useId();
  const MaxConstraint = type.validation[0]._rules.filter(
    (rule) => rule.flag == "max"
  )[0].constraint;

  const handleChange = React.useCallback(
    (event) => {
      const inputValue = event.currentTarget.value;

      onChange(PatchEvent.from(inputValue ? set(inputValue) : unset()));
    },
    [onChange]
  );

  // A function that returns JSX
  return (
    <Stack size={1} space={[2, 2, 3, 3]}>
      <FormField
        id={inputId}
        description={type.description} // Creates description from schema
        title={type.title} // Creates label from schema title
        __unstable_markers={markers} // Handles all markers including validation
        __unstable_presence={presence} // Handles presence avatars
        compareValue={compareValue} // Handles "edited" status
      >
        <TextInput
          id={inputId}
          onChange={handleChange}
          value={value} // Current field value
          readOnly={readOnly} // If "readOnly" is defined make this field read only
          placeholder={placeholder} // If placeholder is defined, display placeholder text
          onFocus={onFocus} // Handles focus events
          onBlur={onBlur} // Handles blur events
          ref={ref}
        />
      </FormField>
      <Text muted size={1}>
        {value ? value.length : 0} / {MaxConstraint}
      </Text>
    </Stack>
  );
});

// Create the default export to import into our schema
export default MyCustomString;
