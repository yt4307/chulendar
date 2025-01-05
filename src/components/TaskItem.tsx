"use client";

import styled from "styled-components";

import type { Task } from "@/types/task";

type TaskItemProps = {
  task: Task;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
};

const TaskItem = ({ task, toggleTask, deleteTask }: TaskItemProps) => (
  <ListItem>
    <Checkbox
      type="checkbox"
      checked={task.completed}
      onChange={() => toggleTask(task.id)}
    />
    <Title completed={task.completed ? true : undefined}>{task.title}</Title>
    <DeleteButton onClick={() => deleteTask(task.id)} title="Delete Task">
      x
    </DeleteButton>
  </ListItem>
);

const ListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: white;
  margin-bottom: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Checkbox = styled.input`
  margin-right: 10px;
  width: 18px;
  height: 18px;
`;

const Title = styled.span<{ completed?: boolean }>`
  flex: 1;
  font-size: 16px;
  text-decoration: ${({ completed }) => (completed ? "line-through" : "none")};
  color: ${({ completed }) => (completed ? "#888" : "#000")};
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: red;
  cursor: pointer;
  font-size: 18px;

  &:hover {
    color: darkred;
  }
`;

export default TaskItem;
