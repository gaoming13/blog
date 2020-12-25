import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

public class Serialization {
  public static void main(String[] main) {
    try {
      // 序列化对象
      String[] arr = {"万", "友", "三"};
      FileOutputStream fileOut = new FileOutputStream("./1.ser");
      ObjectOutputStream out = new ObjectOutputStream(fileOut);
      out.writeObject(arr);
      out.close();
      fileOut.close();
    } catch (IOException e) {
      e.printStackTrace();
    }

    try {
      // 反序列化对象
      FileInputStream fileIn = new FileInputStream("./1.ser");
      ObjectInputStream in = new ObjectInputStream(fileIn);
      String[] arr = (String[]) in.readObject();
      for (String v : arr) {
        System.out.println(v);
      }
      in.close();
      fileIn.close();
    } catch (IOException e) {
      e.printStackTrace();
    } catch (ClassNotFoundException e) {
      e.printStackTrace();
    }
  }
}
