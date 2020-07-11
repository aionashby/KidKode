<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Hello World JSP!</title>
</head>
<body>
    <!-- diplaying the text from the ux txt file the server sent-->
    <c:out value="${text.fileOutput}" />
    <!-- example of some things we can do with JSP with variables/functions/conditionals!-->
    <c:set var="str" value="Our team is so cool"/> 
    <br>
    <br>
    <c:if test="${fn:contains(str,'cool')}">
        this works!
    </c:if>
</body>
</html