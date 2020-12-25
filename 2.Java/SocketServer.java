import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.ServerSocket;
import java.net.Socket;

/**
 * Socket编程 - 服务端
 */
public class SocketServer {
  public static void main(String[] main) {
    try {
      ServerSocket serverSocket = new ServerSocket(1111);
      System.out.println("等待远程连接, 端口号" + serverSocket.getLocalPort());
        Socket server = serverSocket.accept();
        System.out.println("远程主机地址：" + server.getRemoteSocketAddress() + ":" + server.getPort());
        DataOutputStream out = new DataOutputStream(server.getOutputStream());
        out.writeUTF("谢谢连接我：" + server.getLocalSocketAddress() + "\nGoodbye!");
        DataInputStream in = new DataInputStream(server.getInputStream());
        BufferedReader d = new BufferedReader(new InputStreamReader(in));
        String count;
        while((count = d.readLine()) != null){
            String u = count.toUpperCase();
            System.out.println(u);
            out.writeBytes(u + "  ,");
        }
        server.close();
        serverSocket.close();
    } catch (IOException e) {
      System.out.println(e.getStackTrace());
    }
  }
}
