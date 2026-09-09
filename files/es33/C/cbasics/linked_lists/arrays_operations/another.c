#include <stdio.h>

#define MAX 100

void display(int arr[], int n)
{
    for (int i = 0; i < n; i++)
    {
        printf("%d ", arr[i]);
    }
    printf("\n");
}

int insertAtEnd(int arr[], int *n, int val)
{
    if (*n >= MAX)
    {
        printf("Array is full\n");
        return *n;
    }

    arr[*n] = val;
    (*n)++;

    return *n;
}

int insertAtFront(int arr[], int *n, int val)
{
    if (*n >= MAX)
    {
        printf("Array is full\n");
        return *n;
    }

    for (int i = *n; i > 0; i--)
    {
        arr[i] = arr[i - 1];
    }

    arr[0] = val;
    (*n)++;

    return *n;
}

int insertAtParticular(int arr[], int *n, int val, int pos)
{
    if (*n >= MAX)
    {
        printf("Array is full\n");
        return *n;
    }

    if (pos < 0 || pos > *n)
    {
        printf("Invalid position\n");
        return *n;
    }

    for (int i = *n; i > pos; i--)
    {
        arr[i] = arr[i - 1];
    }

    arr[pos] = val;
    (*n)++;

    return *n;
}

int deleteAtFront(int arr[], int *n)
{
    if (*n <= 0)
    {
        printf("Array is empty\n");
        return *n;
    }

    for (int i = 0; i < *n - 1; i++)
    {
        arr[i] = arr[i + 1];
    }

    (*n)--;

    return *n;
}

int deleteAtEnd(int arr[], int *n)
{
    if (*n <= 0)
    {
        printf("Array is empty\n");
        return *n;
    }

    (*n)--;

    return *n;
}

int deleteAtParticular(int arr[], int *n, int pos)
{
    if (*n <= 0)
    {
        printf("Array is empty\n");
        return *n;
    }

    if (pos < 0 || pos >= *n)
    {
        printf("Invalid position\n");
        return *n;
    }

    for (int i = pos; i < *n - 1; i++)
    {
        arr[i] = arr[i + 1];
    }

    (*n)--;

    return *n;
}

int main()
{
    int n, val, pos;
    int arr[MAX];

    printf("Enter number of elements: ");
    scanf("%d", &n);

    if (n < 0 || n > MAX)
    {
        printf("Invalid number of elements\n");
        return 1;
    }

    printf("Enter %d elements:\n", n);

    for (int i = 0; i < n; i++)
    {
        scanf("%d", &arr[i]);
    }

    printf("\nOriginal array: ");
    display(arr, n);

    // Insert at end
    printf("\nEnter value to insert at end: ");
    scanf("%d", &val);

    n = insertAtEnd(arr, &n, val);

    printf("After insertion at end: ");
    display(arr, n);

    // Insert at front
    printf("\nEnter value to insert at front: ");
    scanf("%d", &val);

    n = insertAtFront(arr, &n, val);

    printf("After insertion at front: ");
    display(arr, n);

    // Insert at particular position
    printf("\nEnter position to insert: ");
    scanf("%d", &pos);

    printf("Enter value: ");
    scanf("%d", &val);

    n = insertAtParticular(arr, &n, val, pos);

    printf("After insertion at position %d: ", pos);
    display(arr, n);

    // Delete at front
    n = deleteAtFront(arr, &n);

    printf("\nAfter deleting at front: ");
    display(arr, n);

    // Delete at end
    n = deleteAtEnd(arr, &n);

    printf("After deleting at end: ");
    display(arr, n);

    // Delete at particular position
    printf("\nEnter position to delete: ");
    scanf("%d", &pos);

    n = deleteAtParticular(arr, &n, pos);

    printf("After deleting at position %d: ", pos);
    display(arr, n);

    return 0;
}


// #include <stdio.h>

// #define MAX 100

// void display(int arr[], int n)
// {
//     if (n == 0)
//     {
//         printf("Array is empty\n");
//         return;
//     }

//     printf("Array elements: ");

//     for (int i = 0; i < n; i++)
//     {
//         printf("%d ", arr[i]);
//     }

//     printf("\n");
// }

// int insertAtBeginning(int arr[], int n, int value)
// {
//     if (n >= MAX)
//     {
//         printf("Array is full\n");
//         return n;
//     }

//     for (int i = n; i > 0; i--)
//     {
//         arr[i] = arr[i - 1];
//     }

//     arr[0] = value;

//     return n + 1;
// }

// int insertAtEnd(int arr[], int n, int value)
// {
//     if (n >= MAX)
//     {
//         printf("Array is full\n");
//         return n;
//     }

//     arr[n] = value;

//     return n + 1;
// }

// int insertAtPosition(int arr[], int n, int value, int position)
// {
//     if (n >= MAX)
//     {
//         printf("Array is full\n");
//         return n;
//     }

//     if (position < 1 || position > n + 1)
//     {
//         printf("Invalid position\n");
//         return n;
//     }

//     // Shift elements to the right
//     for (int i = n; i >= position; i--)
//     {
//         arr[i] = arr[i - 1];
//     }

//     arr[position - 1] = value;

//     return n + 1;
// }

// int deleteAtBeginning(int arr[], int n)
// {
//     if (n == 0)
//     {
//         printf("Array is empty\n");
//         return n;
//     }

//     // Shift elements to the left
//     for (int i = 0; i < n - 1; i++)
//     {
//         arr[i] = arr[i + 1];
//     }

//     return n - 1;
// }

// int deleteAtEnd(int arr[], int n)
// {
//     if (n == 0)
//     {
//         printf("Array is empty\n");
//         return n;
//     }

//     return n - 1;
// }

// int deleteAtPosition(int arr[], int n, int position)
// {
//     if (n == 0)
//     {
//         printf("Array is empty\n");
//         return n;
//     }

//     if (position < 1 || position > n)
//     {
//         printf("Invalid position\n");
//         return n;
//     }

//     // Shift elements to the left
//     for (int i = position - 1; i < n - 1; i++)
//     {
//         arr[i] = arr[i + 1];
//     }

//     return n - 1;
// }

// int search(int arr[], int n, int value)
// {
//     for (int i = 0; i < n; i++)
//     {
//         if (arr[i] == value)
//         {
//             return i;
//         }
//     }

//     return -1;
// }

// int main()
// {
//     int arr[MAX];
//     int n;
//     int choice;
//     int value;
//     int position;
//     int index;

//     printf("Enter number of elements: ");
//     scanf("%d", &n);

//     if (n < 0 || n > MAX)
//     {
//         printf("Invalid size\n");
//         return 0;
//     }

//     printf("Enter %d elements:\n", n);

//     for (int i = 0; i < n; i++)
//     {
//         scanf("%d", &arr[i]);
//     }

//     while (1)
//     {
//         printf("\n========== ARRAY MENU ==========\n");

//         printf("1. Display\n");
//         printf("2. Insert at beginning\n");
//         printf("3. Insert at end\n");
//         printf("4. Insert at particular position\n");
//         printf("5. Delete from beginning\n");
//         printf("6. Delete from end\n");
//         printf("7. Delete from particular position\n");
//         printf("8. Search\n");
//         printf("9. Update at position\n");
//         printf("10. Exit\n");

//         printf("Enter your choice: ");
//         scanf("%d", &choice);

//         switch (choice)
//         {
//         case 1:
//             display(arr, n);
//             break;

//         case 2:
//             printf("Enter value: ");
//             scanf("%d", &value);

//             n = insertAtBeginning(arr, n, value);

//             display(arr, n);
//             break;

//         case 3:
//             printf("Enter value: ");
//             scanf("%d", &value);

//             n = insertAtEnd(arr, n, value);

//             display(arr, n);
//             break;

//         case 4:
//             printf("Enter value: ");
//             scanf("%d", &value);

//             printf("Enter position: ");
//             scanf("%d", &position);

//             n = insertAtPosition(arr, n, value, position);

//             display(arr, n);
//             break;

//         case 5:
//             n = deleteAtBeginning(arr, n);

//             display(arr, n);
//             break;

//         case 6:
//             n = deleteAtEnd(arr, n);

//             display(arr, n);
//             break;

//         case 7:
//             printf("Enter position to delete: ");
//             scanf("%d", &position);

//             n = deleteAtPosition(arr, n, position);

//             display(arr, n);
//             break;

//         case 8:
//             printf("Enter value to search: ");
//             scanf("%d", &value);

//             index = search(arr, n, value);

//             if (index == -1)
//             {
//                 printf("Element not found\n");
//             }
//             else
//             {
//                 printf("Element found at position %d\n", index + 1);
//             }

//             break;

//         case 9:
//             printf("Enter position: ");
//             scanf("%d", &position);

//             if (position < 1 || position > n)
//             {
//                 printf("Invalid position\n");
//             }
//             else
//             {
//                 printf("Enter new value: ");
//                 scanf("%d", &value);

//                 arr[position - 1] = value;

//                 printf("Array updated successfully\n");
//                 display(arr, n);
//             }

//             break;

//         case 10:
//             printf("Program terminated\n");
//             return 0;

//         default:
//             printf("Invalid choice\n");
//         }
//     }

//     return 0;
// }