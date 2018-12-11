import com.google.gson.Gson;

import javax.servlet.annotation.WebServlet;
import java.io.IOException;
import java.util.ArrayList;

@WebServlet("/sariLeisiyu")
public class CalServlet extends javax.servlet.http.HttpServlet {
   protected void doPost (javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {
      Gson gson = new Gson();
      String inPath = request.getParameter("inputPath");
      String outPath = request.getParameter("outPath");
      String[] include = request.getParameter("include").split("-");
      String[] exception = request.getParameter("exception").split("-");
      ArrayList<String> includeArr = new ArrayList<>();
      ArrayList<String> exceptionArr = new ArrayList<>();
      for (String ele : include) {
         if (!ele.equals("")) {
            includeArr.add(ele);
         }
      }
      for (String ele : exception) {
         if (!ele.equals("")) {
            exceptionArr.add(ele);
         }
      }
      System.out.println(gson.toJson(includeArr));
      System.out.println(gson.toJson(exceptionArr));
      ArrayList<String> result = readTxt.toArrayByFileReader(inPath, includeArr, exceptionArr);
      readTxt.writeFile(outPath, result);
      response.getWriter().print("200");
   }

   protected void doGet (javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {
      this.doPost(request, response);
   }
}
