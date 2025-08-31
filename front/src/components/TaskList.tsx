import {
  useEffect,
  useState,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Card, Tag, List, Spin, Typography } from "antd";
import { apolloClient } from "../apollo/client";
import type { Task } from "../graphql/operations";
import {
  GET_TASK,
  type GetTaskResponse,
  type GetTaskVars,
} from "../graphql/operations";

const { Text } = Typography;

export type TaskListRef = {
  addTask: (task: Task) => void;
};

export const TaskList = forwardRef<TaskListRef, { initialTasks?: Task[] }>(
  ({ initialTasks = [] }, ref) => {
    const [tasks, setTasks] = useState<Record<string, Task>>(
      Object.fromEntries(initialTasks.map((t) => [t.id, t]))
    );

    const updateTaskFromServer = useCallback(async (id: string) => {
      try {
        const { data } = await apolloClient.query<GetTaskResponse, GetTaskVars>(
          {
            query: GET_TASK,
            variables: { id },
            fetchPolicy: "network-only",
          }
        );

        if (data?.task) {
          setTasks((prev) => ({ ...prev, [id]: data.task }));
        }
      } catch (err) {
        console.error("Failed fetching task", id, err);
      }
    }, []);

    useEffect(() => {
      const interval = setInterval(() => {
        Object.values(tasks).forEach((t) => {
          if (t.status === "processing") updateTaskFromServer(t.id);
        });
      }, 3000);

      return () => clearInterval(interval);
    }, [tasks, updateTaskFromServer]);

    // метод для добавления новой задачи
    const addTask = (task: Task) =>
      setTasks((prev) => ({ ...prev, [task.id]: task }));

    // пробрасываем наружу
    useImperativeHandle(ref, () => ({
      addTask,
    }));

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
