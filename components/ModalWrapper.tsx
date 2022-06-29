import React from "react";
import styled from "styled-components";

import { IoMdClose } from "react-icons/io";

interface IProps {
  children: any;
  onClose: () => void;
}

export const ModalWrapper: React.FC<IProps> = ({ children, onClose }) => {
  return (
    <ModalContainer>
      <ModalContent>
        <IoMdClose onClick={onClose} />
        {children}
      </ModalContent>
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: #00000099;
`;

const ModalContent = styled.div`
  padding: 1rem;
  position: relative;
  border-radius: 2rem;
  background-color: #ffffff;
`;
