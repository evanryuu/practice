// 🌟🌟 q5. Rust 中没有 null，我们通过 Option<T> 枚举来处理值为空的情况

fn main() {
  let five = Some(5);
  let six = plus_one(five);
  let none = plus_one(None);

  if let Some(n) = six {
      println!("{}", n);
      return
  } 
  
  panic!("NEVER LET THIS RUN!");
} 

fn plus_one(x: Option<i32>) -> Option<i32> {
  match x {
      None => None,
      Some(i) => Some(i + 1),
  }
}
