import React, { useRef, useEffect } from "react";
import { AgentProps } from "../../types/agent-types";
import s from "./add-agent-modal.module.scss";

interface AddAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAgent: (agent: AgentProps) => void;
  onUpdateAgent: (agent: AgentProps) => void;
  agentToEdit?: AgentProps;
}

const AddAgentModal: React.FC<AddAgentModalProps> = ({
  isOpen,
  onClose,
  onAddAgent,
  onUpdateAgent,
  agentToEdit,
}) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const lastseenRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (agentToEdit) {
      if (nameRef.current) nameRef.current.value = agentToEdit.name;
      if (emailRef.current) emailRef.current.value = agentToEdit.email;
      if (lastseenRef.current) lastseenRef.current.value = agentToEdit.lastseen;
    } else {
      if (nameRef.current) nameRef.current.value = "";
      if (emailRef.current) emailRef.current.value = "";
      if (lastseenRef.current) lastseenRef.current.value = "";
    }
  }, [agentToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAgent: AgentProps = {
      id: agentToEdit ? agentToEdit.id : Date.now().toString(),
      isActive: true,
      name: nameRef.current?.value || "",
      email: emailRef.current?.value || "",
      lastseen: lastseenRef.current?.value || "",
    };
    if (agentToEdit) {
      onUpdateAgent(newAgent);
    } else {
      onAddAgent(newAgent);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={s.modal}>
      <div className={s.modalContent}>
        <h2>{agentToEdit ? "Update Agent" : "Add Agent"}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input type="text" ref={nameRef} required />
          </div>
          <div>
            <label>Email</label>
            <input type="email" ref={emailRef} required />
          </div>
          <div>
            <label>Last Seen</label>
            <input type="datetime-local" ref={lastseenRef} required />
          </div>
          <button type="submit">
            {agentToEdit ? "Update Agent" : "Add Agent"}
          </button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAgentModal;
