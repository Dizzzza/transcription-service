import { useEffect, useState, useImperativeHandle, forwardRef } from "react";
import { Card, Tag, List, Spin, Typography, Alert } from "antd";
import type { Task } from "../graphql/operations";
import { useGetAllTasks } from "../graphql/hooks";

const { Text } = Typography;

export type TaskListRef = {
  addTask: (task: Task) => void;
};

export const TaskList = forwardRef<TaskListRef, { initialTasks?: Task[] }>(
  ({ initialTasks = [] }, ref) => {
    const [tasks, setTasks] = useState<Record<string, Task>>(
      Object.fromEntries(initialTasks.map((t) => [t.id, t]))
    );

    // подтягиваем все задачи + обновляем каждую секунду
    const { data, error } = useGetAllTasks();

    // если пришли новые данные — обновляем стейт
    useEffect(() => {
      if (data?.getAllTasks) {
        setTasks(
          Object.fromEntries(data.getAllTasks.map((t: Task) => [t.id, t]))
        );
      }
    }, [data]);

    // метод для добавления новой задачи
    const addTask = (task: Task) =>
      setTasks((prev) => ({ ...prev, [task.id]: task }));

    useImperativeHandle(ref, () => ({
      addTask,
    }));

    if (error) {
      return (
        <Alert
          type="error"
          message="Ошибка загрузки задач"
          description={error.message}
        />
      );
    }

    return (
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={Object.values(tasks).sort((a, b) => (a.id < b.id ? -1 : 1))}
        renderItem={(task) => (
          <List.Item key={task.id}>
            <Card>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <Text strong>Task ID:</Text> <Text code>{task.id}</Text>
                  <div>
                    <a href={task.s3Url} target="_blank" rel="noreferrer">
                      Открыть файл
                    </a>
                  </div>
                </div>

                <div>
                  {task.status === "processing" ? (
                    <Tag color="orange">Processing</Tag>
                  ) : (
                    <Tag color="green">Completed</Tag>
                  )}
                </div>
              </div>

              <div style={{ marginTop: 12 }}>
                {task.status === "processing" ? (
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 12 }}
                  >
                    <Spin />
                    <span>Идёт транскрибация...</span>
                  </div>
                ) : (
                  <div>
                    <Text strong>Transcription:</Text>
                    <div style={{ marginTop: 8 }}>
                      {task.transcription ?? <i>Пусто</i>}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </List.Item>
        )}
      />
    );
  }
);
