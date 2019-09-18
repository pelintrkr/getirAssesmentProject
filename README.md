# getirAssesmentProject

This project is developped for a RESTful API with a single endpoint that fetches the data in the
provided MongoDB collection and return the results in the requested format.

The code is written in Node.js using express framework.

Service can be test at http://ec2-3-17-176-218.us-east-2.compute.amazonaws.com:3000/api/filterByDateAndCount
with sample request
{
"startDate": "2016-01-26",
"endDate": "2018-02-02",
"minCount": 1,
"maxCount": 10000
}
