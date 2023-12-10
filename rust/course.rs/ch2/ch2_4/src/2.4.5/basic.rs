use std::io;

fn main() {
  basic_sample();
  copy_multi();
}

fn basic_sample() {
  let a = [1, 2, 3, 4, 5];

  println!("Please enter an array index.");

  let mut index = String::new();
  // 读取控制台的输出
  io::stdin()
      .read_line(&mut index)
      .expect("Failed to read line");

  let index: usize = index
      .trim()
      .parse()
      .expect("Index entered was not a number");

  let element = a[index];

  println!(
      "The value of the element at index {} is: {}",
      index, element
  );
}

fn copy_multi() {
    let array: [String; 8] = std::array::from_fn(|_i| String::from("rust is good!"));

    println!("{:#?}", array);
}
