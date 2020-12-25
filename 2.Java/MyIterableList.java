import java.util.Iterator;

/**
 * 自定义类实现迭代器接口
 */
class MyIterableList implements java.lang.Iterable<String> {
  private String [] list = {"girl", "boy"};

  public Iterator<String> iterator() {
    return new Iterator<String>() {
      private int cursor = -1;

      public boolean hasNext() {
        return cursor + 1 < list.length;
      }

      public String next() {
        return list[++cursor];
      }
    };
  }
}

public class MyIterableListMain {
  public static void main (String[] args) {
    MyIterableList list1 = new MyIterableList();
    // 迭代1
    Iterator<String> it = list1.iterator();
    while (it.hasNext()) {
      System.out.println(it.next());
    }
    // 迭代2
    for (String v : list1) {
      System.out.println(v);
    }
  }
}