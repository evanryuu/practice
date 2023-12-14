// https://zh.practice.rs/flow-control.html
// 填空
fn q2() {
  let n = 5;

  if n < 0 {
      println!("{} is negative", n);
  } __ n > 0 {
      println!("{} is positive", n);
  } __ {
      println!("{} is zero", n);
  }
} 


// 修复错误，不要新增或删除代码行
fn q4() {
    let names = [String::from("liming"),String::from("hanmeimei")];
    for name in names {
        // do something with name...
    }

    println!("{:?}", names);

    let numbers = [1, 2, 3];
    // numbers中的元素实现了 Copy，因此无需转移所有权
    for n in numbers {
        // do something with name...
    }
    
    println!("{:?}", numbers);
} 

fn  q5() {
    let a = [4,3,2,1];

    // 通过索引和值的方式迭代数组 `a` 
    for (i,v) in a.__ {
        println!("第{}个元素是{}",i+1,v);
    }
}

// 🌟🌟 loop 是一个表达式，因此我们可以配合 break 来返回一个值
fn q10() {
    // 填空
    let mut counter = 0;

    let result = loop {
        counter += 1;

        if counter == 10 {
            __;
        }
    };

    assert_eq!(result, 20);
}


// 🌟🌟🌟 当有多层循环时，你可以使用 continue 或 break 来控制外层的循环。要实现这一点，外部的循环必须拥有一个标签 'label, 然后在 break 或 continue 时指定该标签
fn q11() {
    let mut count = 0;
    'outer: loop {
        'inner1: loop {
            if count >= 20 {
                // 这只会跳出 inner1 循环
                break 'inner1; // 这里使用 `break` 也是一样的
            }
            count += 2;
        }

        count += 5;

        'inner2: loop {
            if count >= 30 {
                break 'outer;
            }

            continue 'outer;
        }
    }

    assert!(count == __)
}
