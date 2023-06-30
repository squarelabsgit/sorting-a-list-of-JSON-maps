# Sorting a List of JSON Maps by a Specific Field
Blog Post: https://www.squarelabs.com.au/post/sorting-a-list-of-json-maps-by-a-specific-field

When you use custom functions in Zoho CRM, you will often find yourself dealing with lists of JSON maps. One thing that you cannot do natively with deluge is sort a list of JSON maps by a specific field, but you can sort a list of values. We can use this to our advantage.

Let's take this list of tasks that we have here in JSON format, as well as the data represented as a table.

Task List JSON
```js
[
  {
      "id": "5775875000000545579",
      "Task_Name": "Prepare Report",
      "Status": "In Progress",
      "Due_Date": "2023-07-01"
  },
  {
      "id": "5775875000000545580",
      "Task_Name": "Run Competitor Analysis",
      "Status": "Not Started",
      "Due_Date": "2023-06-08"
  },
  {
      "id": "5775875000000545581",
      "Task_Name": "Get Approval of Scope",
      "Status": "Not Started",
      "Due_Date": "2023-07-15"
  },
  {
      "id": "5775875000000545582",
      "Task_Name": "Send Project Invoice",
      "Status": "Not Started",
      "Due_Date": "2023-07-22"
  },
  {
      "id": "5775875000000545583",
      "Task_Name": "Follow up",
      "Status": "In Progress",
      "Due_Date": "2023-06-21"
  },
  {
      "id": "5775875000000545584",
      "Task_Name": "Create Purchase Order",
      "Status": "In Progress",
      "Due_Date": "2023-06-06"
  }
]
```
Task List Table
|           id           |     Task_Name     |    Status    |  Due_Date   |
|:---------------------:|:-----------------:|:------------:|:----------:|
| 5775875000000545579   | Prepare Report    | In Progress  | 2023-07-01 |
| 5775875000000545580   | Run Competitor Analysis | Not Started | 2023-06-08 |
| 5775875000000545581   | Get Approval of Scope | Not Started | 2023-07-15 |
| 5775875000000545582   | Send Project Invoice | Not Started | 2023-07-22 |
| 5775875000000545583   | Follow up         | In Progress  | 2023-06-21 |
| 5775875000000545584   | Create Purchase Order | In Progress | 2023-06-06 |

We can see that the data is currently sorted by the 'id', but we want to sort it using the 'due date' with the oldest at the top. For us, that is a much more realistic way to view our upcoming and overdue tasks.

### Example Code
Using this snippet of code, we can achieve what we are after. I'll explain in detail all the components that make it work.
```js
//The unsorted list word be your source data
unsortedList = [{},{}...];
//Required Variables
unsortedKeys = List();
unsortedKeyValueData = Map();
sortedList = List();
//Go through each item in the list
for each item in unsortedList
{
    //Get the value to sort with and add unique value on the end
    sortingValue = item.get("Due_Date") + "-" + item.get("id");
    //Add the sorting value to a list
    unsortedKeys.add(sortingValue);
    //Add the sorting value to the unsorted key value map as the key & the item data as the value
    unsortedKeyValueData.put(sortingValue,item);
}
//Sort the keys
sortedKeys = unsortedKeys.sort(true);
//Compile the sorted list in order by going through each key and adding them to a new list.
for each  key in sortedKeys
{
    sortedList.add(unsortedKeyValueData.get(key));
}
//Now do whatever you want with your sorted list
```

### How it works
First, we iterate through all of the tasks in the list and retrieve the value we want to sort by, which in this case is the 'Due_Date.' We save each of these values to another list called 'unsortedKeys'. In situations where the value is not unique and there's a possibility of having the same value for multiple records, I like to append the record's ID to the end of the value. This is done as a precautionary measure, as the sorting process will not work if there are any duplicate keys.

```js
[
    "2023-07-01-5775875000000545579",
    "2023-06-08-5775875000000545580",
    "2023-07-15-5775875000000545581",
    "2023-07-22-5775875000000545582",
    "2023-06-21-5775875000000545583",
    "2023-06-06-5775875000000545584"
]
```

Simultaneously, while iterating through the tasks, we also create a new Map called 'unsortedKeyValueData'. In this Map, we use the sorting value as the key and the task data as the corresponding value. This mapping allows us to easily locate a task based on its unique key value.

```js
{
    "2023-07-01-5775875000000545579": {
        "id": "5775875000000545579",
        "Task_Name": "Prepare Report",
        "Status": "In Progress",
        "Due_Date": "2023-07-01"
    },
    "2023-06-08-5775875000000545580": {
        "id": "5775875000000545580",
        "Task_Name": "Run Competitor Analysis",
        "Status": "Not Started",
        "Due_Date": "2023-06-08"
    },
    "2023-07-15-5775875000000545581": {
        "id": "5775875000000545581",
        "Task_Name": "Get Approval of Scope",
        "Status": "Not Started",
        "Due_Date": "2023-07-15"
    },
    "2023-07-22-5775875000000545582": {
        "id": "5775875000000545582",
        "Task_Name": "Send Project Invoice",
        "Status": "Not Started",
        "Due_Date": "2023-07-22"
    },
    "2023-06-21-5775875000000545583": {
        "id": "5775875000000545583",
        "Task_Name": "Follow up",
        "Status": "In Progress",
        "Due_Date": "2023-06-21"
    },
    "2023-06-06-5775875000000545584": {
        "id": "5775875000000545584",
        "Task_Name": "Create Purchase Order",
        "Status": "In Progress",
        "Due_Date": "2023-06-06"
    }
}
```

### Sorting the Keys
Since the 'unsortedKeys' list only contains values, we can now sort these values using the deluge sort function. By doing so, we can arrange the keys in ascending order. In the case of dates, this means the oldest date will appear first.

### Reordering the List
Now that we have a sorted list of keys, all we need to do is iterate through this list. During each iteration, we retrieve the corresponding values from the 'unsortedKeyValueData' map we created earlier. We can then add these values to a new list which will be in the order we want.

Here is an example of the result we achieved.

```js
[
  {
    "id": "5775875000000545584",
    "Task_Name": "Create Purchase Order",
    "Status": "In Progress",
    "Due_Date": "2023-06-06"
  },
  {
    "id": "5775875000000545580",
    "Task_Name": "Run Competitor Analysis",
    "Status": "Not Started",
    "Due_Date": "2023-06-08"
  },
  {
    "id": "5775875000000545583",
    "Task_Name": "Follow up",
    "Status": "In Progress",
    "Due_Date": "2023-06-21"
  },
  {
    "id": "5775875000000545579",
    "Task_Name": "Prepare Report",
    "Status": "In Progress",
    "Due_Date": "2023-07-01"
  },
  {
    "id": "5775875000000545581",
    "Task_Name": "Get Approval of Scope",
    "Status": "Not Started",
    "Due_Date": "2023-07-15"
  },
  {
    "id": "5775875000000545582",
    "Task_Name": "Send Project Invoice",
    "Status": "Not Started",
    "Due_Date": "2023-07-22"
  }
]
```
Sorted Task List Table
|        id        |     Task_Name     |    Status    |  Due_Date   |
|:----------------:|:-----------------:|:------------:|:----------:|
| 5775875000000545584 | Create Purchase Order | In Progress | 2023-06-06 |
| 5775875000000545580 | Run Competitor Analysis | Not Started | 2023-06-08 |
| 5775875000000545583 | Follow up | In Progress | 2023-06-21 |
| 5775875000000545579 | Prepare Report | In Progress | 2023-07-01 |
| 5775875000000545581 | Get Approval of Scope | Not Started | 2023-07-15 |
| 5775875000000545582 | Send Project Invoice | Not Started | 2023-07-22 |


By following the steps outlined above, you can effectively sort any list of JSON Maps by a specific field. This is really useful especially when you are building custom related lists or reordering subform records. Happy sorting!

Need Help? [Contact Us!](https://www.squarelabs.com.au/contact-us)
