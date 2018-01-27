name := """play-java-starter-example"""

version := "1.0-SNAPSHOT"

scalaVersion := "2.12.4"

crossScalaVersions := Seq("2.11.12", "2.12.4")

libraryDependencies += guice

// Test Database
libraryDependencies += "com.h2database" % "h2" % "1.4.196"

// Testing libraries for dealing with CompletionStage...
libraryDependencies += "org.assertj" % "assertj-core" % "3.6.2" % Test
libraryDependencies += "org.awaitility" % "awaitility" % "2.0.0" % Test

libraryDependencies += "mysql" % "mysql-connector-java" % "5.1.41"
libraryDependencies += jdbc;

// Make verbose tests
testOptions in Test := Seq(Tests.Argument(TestFrameworks.JUnit, "-a", "-v"))

lazy val myProject = (project in file(".")).enablePlugins(PlayJava, PlayEbean)