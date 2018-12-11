import com.google.gson.Gson;

import java.io.*;
import java.util.ArrayList;

public class readTxt {
   private static ArrayList<String> includeArr = new ArrayList<String>() {{
      add("呢");
      add("呢");
      add("啊");
      add("吧");
   }};

   private static ArrayList<String> exceptionArr = new ArrayList<String>() {{
      add("什么");
      add("怎么");
      add("谁");
      add("哪");
      add("啥");
      add("如何");
   }};

//  protected static void init (String[] include, String[] exception) {
//      Gson gson = new Gson();
//      System.out.println(gson.toJson(includeArr));
//      for (String ele : include) {
//         if (!ele.equals("")) {
//            includeArr.add(ele);
//         }
//      }
//      System.out.println("includeArr:" + gson.toJson(includeArr));
//      for (String ele : exception) {
//         if (!ele.equals("")) {
//            exceptionArr.add(ele);
//         }
//      }
//      System.out.println("exceptionArr:" + gson.toJson(exceptionArr));
//   }

   static ArrayList<String> toArrayByFileReader (String name, ArrayList<String> includeArr, ArrayList<String> exceptionArr) throws IOException {
      ArrayList<String> arrayList = new ArrayList<>();
      try {
         FileInputStream in = new FileInputStream(name);
         BufferedReader bf = new BufferedReader(new InputStreamReader(in, "gb2312"));
         String str;
         // 按行读取字符串
         while ((str = bf.readLine()) != null) {
            arrayList.add(str);
         }
         bf.close();
         in.close();
      } catch (IOException e) {
         e.printStackTrace();
      }

      int includeLen = 0;
      for (int i = arrayList.size() - 1; i >= 0; i--) {
         String item = arrayList.get(i);
         for (String s : includeArr) {
            if (!item.contains(s)) {
               includeLen++;
            }
         }
         if (includeLen == includeArr.size()) {
            arrayList.remove(item);
            includeLen = 0;
            continue;
         }
         includeLen = 0;
         for (String s : exceptionArr) {
            if (item.contains(s)) {
               arrayList.remove(item);
               break;
            }
         }
      }
      return arrayList;
   }

   static void writeFile (String name,ArrayList<String> arrayList) {
      try {
         File writeName = new File(name); // 相对路径，如果没有则要建立一个新的output.txt文件
         writeName.createNewFile(); // 创建新文件,有同名的文件的话直接覆盖
         try (FileWriter writer = new FileWriter(writeName);
              BufferedWriter out = new BufferedWriter(writer)
         ) {
            for (String ele : arrayList) {
               out.write(ele);
               out.write("\r\n");
            }
            out.flush(); // 把缓存区内容压入文件
         }
      } catch (IOException e) {
         e.printStackTrace();
      }
   }
//   public static void main (String[] args) throws IOException {
//
//      ArrayList<String> result = toArrayByFileReader(filePath);
//      System.out.println(result.size());
//      writeFile(result);
//   }
}