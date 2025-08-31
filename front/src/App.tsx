import { useRef } from "react";
import { ApolloProvider } from "@apollo/client/react";
import { apolloClient } from "./apollo/client";
import { UploadForm } from "./components/UploadForm";
import { TaskList, type TaskListRef } from "./components/TaskList";
import { Layout, Typography, Divider } from "antd";
import "antd/dist/reset.css";

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  // для простоты — будем обращаться к TaskList через window.__addTask (или можно поднять стейт в App)
  const taskListRef = useRef<TaskListRef>(null);

  const handleTaskCreated = (task: {
    id: string;
    status: string;
    s3Url: string;
  }) => {
    // если у тебя есть публичный метод, можно вызвать:
    if (window.__addTask) {
      window.__addTask(task);
    }
    // или можно хранить tasks в App и прокинуть в TaskList через props
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
