<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Your Result!</title>
<link rel="stylesheet" href="${pageContext.request.contextPath}/results.css"/>
<link rel="stylesheet" href="https://use.typekit.net/wdi1hdi.css">
</head>
<body>
    <!-- diplaying the text from the txt file the server sent-->
    <h2 class="heading">You might like</h2>
    <h1 class="title"><c:out value="${text.title}" /></h1>
    <p><img src=${text.mainImagePath}><img></p>
    <p class="description"><c:out value="${text.description}" /></p>
    
    <div class = "centerLinks">
    <h3>Check out some cool websites and games related to your interests below:</h3>
        <ul>
        <c:forEach var="link" items="${text.links}">
            <li><a href=<c:out value="${link}"/>><c:out value="${link}"/></a></li>
        </c:forEach> 
        <ul> 
    <div>
</body>
