use std::fs;

fn main(){
  let data = fs::read_to_string("./inputs/3.txt").expect("Unable to read file");
  let lines = data.split("\n");
  let lines_vec: Vec<&str> = lines.collect();
  let mut sum_priority = 0;

  for group_index in 0..(lines_vec.len() / 3) {
    let first_line = &lines_vec[group_index * 3];
    let other_lines = &lines_vec[group_index * 3 + 1..group_index * 3 + 3];

    for ch in first_line.chars() {
      if other_lines.iter().all(|&line| line.contains(ch)) {
        let ascii_char = ch as u32;
        let priority: u32;

        if ascii_char > 64 && ascii_char < 91 {
          priority = ascii_char - 64 + 26;
        } else {
          priority = ascii_char - 96;
        }

        sum_priority += priority;
        break;
      }
    }
  }

  println!("Sum of priorities: {}", sum_priority);
}