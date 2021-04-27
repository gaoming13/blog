public class Generics {

  public static void main(String[] args) {
    printArray(new String[] {"aa", "bb"});
    printArray(new Double[] {1.11, 2.22});

    System.out.println(max(1, 2, 3));
    System.out.println(max("a", "b", "c"));

    Box<Float> box1 = new Box<>();
    box1.set((float) 100);
    System.out.println(box1.get());
    getDate(box1);
  }

  // 泛型函数
  public static <E> void printArray(E[] arr) {
    for (E v : arr) {
      System.out.println(v.getClass());
    }
  }

  // 泛型限定
  public static <T extends Comparable<T>> T max(T x, T y, T z) {
    T max = x;
    if (y.compareTo(max) > 0) max = y;
    if (z.compareTo(max) > 0) max = z;
    return max;
  }

  // 泛型限定
  public static void getDate(Box<? super Float> box1) {
    System.out.println(box1.get());
  }
}

// 泛型类
class Box<T> {
  private T t;

  public void set(T t) {
    this.t = t;
  }

  public T get() {
    return this.t;
  }
}