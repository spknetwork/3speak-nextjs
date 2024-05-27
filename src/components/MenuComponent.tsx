import React, { useState } from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
} from '@chakra-ui/react';

export default function ChakraDropdown() {
  const [value, setValue] = useState('');

  const handleSelect = (newValue:any) => {
    setValue(newValue);
  };

  return (
    <Menu >
      <MenuButton as={Button} colorScheme="blue">
        {value || 'Select an option'}
      </MenuButton>
      <MenuList>
        <MenuOptionGroup defaultValue={value} type="radio" onChange={handleSelect}>
          <MenuItemOption value="option1" w={160}>Option 1</MenuItemOption>
          <MenuItemOption value="option2" w={160}>Option 2</MenuItemOption>
          <MenuItemOption value="option3" w={160}>Option 3</MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}