public class Lambda {
  public static void main(String[] args) {
    // 闭包1
    Add add1 = (a, b) -> a + b;
    System.out.println(add1.f1(1, 2));

    // 闭包2
    Say say1 = s -> {
      System.out.println(s);;
    };
    say1.say("Hello");
  }
}

interface Add {
  int f1(int a, int b);
}

interface Say {
  void say(String s);
}