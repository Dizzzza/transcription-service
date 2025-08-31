import { useRef } from "react";
import { ApolloProvider } from "@apollo/client/react";
import { apolloClient } from "./apollo/client";
import { UploadForm } from "./components/UploadForm";
import { TaskList, type TaskListRef } from "./components/TaskList";
import { Layout, Typography, Divider } from "antd";
import "antd/dist/reset.css";
import type { Task } from "./graphql/operations";

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  const taskListRef = useRef<TaskListRef>(null);

  const handleTaskCreated = (task: Task) => {
    // сразу добавляем таску в TaskList
    taskListRef.current?.addTask(task);
  };

  return (
    <ApolloProvider client={apolloClient}>
      <Layout style={{ minHeight: "100vh" }}>
        <Header style={{ background: "#fff" }}>
          <Title level={3}>Сервис транскрибации аудио</Title>
        </Header>
        <Content style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
          <UploadForm onTaskCreated={handleTaskCreated} />
          <Divider />
          <TaskList ref={taskListRef} />
        </Content>
      </Layout>
    </ApolloProvider>
  );
}

export default App;
