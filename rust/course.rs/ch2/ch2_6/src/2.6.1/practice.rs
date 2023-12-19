// https://zh.practice.rs/pattern-match/match-iflet.html

fn q1() {
    // 填空
    enum Direction {
        East,
        West,
        North,
        South,
    }

    fn main() {
        let dire = Direction::South;
        match dire {
            Direction::East => println!("East"),
            __ => {
                // 在这里匹配 South 或 North
                println!("South or North");
            }
            _ => println!(__),
        };
    }
}

fn q2() {
    fn main() {
        let boolean = true;

        // 使用 match 表达式填空，并满足以下条件
        //
        // boolean = true => binary = 1
        // boolean = false => binary = 0
        let binary = __;

        assert_eq!(binary, 1);
    }
}

// 🌟🌟 使用 match 匹配出枚举成员持有的值
fn q3() {
    // 填空
    enum Message {
        Quit,
        Move { x: i32, y: i32 },
        Write(String),
        ChangeColor(i32, i32, i32),
    }

    fn main() {
        let msgs = [
            Message::Quit,
            Message::Move { x: 1, y: 3 },
            Message::ChangeColor(255, 255, 0),
        ];

        for msg in msgs {
            show_message(msg)
        }
    }

    fn show_message(msg: Message) {
        match msg {
            __ => {
                // 这里匹配 Message::Move
                assert_eq!(a, 1);
                assert_eq!(b, 3);
            }
            Message::ChangeColor(_, g, b) => {
                assert_eq!(g, __);
                assert_eq!(b, __);
            }
            __ => println!("no data in these variants"),
        }
    }
}

// matches! 看起来像 match, 但是它可以做一些特别的事情
fn q4() {
    fn main() {
        let alphabets = ['a', 'E', 'Z', '0', 'x', '9', 'Y'];

        // 使用 `matches` 填空
        for ab in alphabets {
            assert!(__)
        }
    }
}

fn q5() {
    enum MyEnum {
        Foo,
        Bar,
    }

    fn main() {
        let mut count = 0;

        let v = vec![MyEnum::Foo, MyEnum::Bar, MyEnum::Foo];
        for e in v {
            if e == MyEnum::Foo {
                // 修复错误，只能修改本行代码
                count += 1;
            }
        }

        assert_eq!(count, 2);
    }
}

fn q7() {
    // 填空
    enum Foo {
        Bar(u8),
    }

    fn main() {
        let a = Foo::Bar(1);

        __ {
            println!("foobar 持有的值是: {}", i);
        }
    }
}
