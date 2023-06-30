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
