
package com;

public class ExternalBookAdapter {
    public static BookInterface convertToBook(String json) {
        try {
            String title = extractField(json, "bookTitle");
            boolean borrowable = Boolean.parseBoolean(extractField(json, "isBorrowable"));
            String author = extractField(json, "authorName");
            int year = Integer.parseInt(extractField(json, "year"));
            
            if (borrowable) {
                return new BorrowableBook(title);
            } else {
                throw new RuntimeException("book not borrowable");
            }
        } catch (Exception e) {
            throw new RuntimeException("Invalid book JSON: " + e.getMessage());
        }
    }
    
    private static String extractField(String json, String fieldName) {
        String pattern = "\"" + fieldName + "\":\"?(.*?)\"?[,}]";
        java.util.regex.Pattern r = java.util.regex.Pattern.compile(pattern);
        java.util.regex.Matcher m = r.matcher(json);
        if (m.find()) {
            return m.group(1).replace("\"", "");
        }
        throw new RuntimeException("Field " + fieldName + " not found");
    }
}
