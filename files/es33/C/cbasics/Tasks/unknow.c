// Q2 Dynamic Number Analyzer 10M
// Problem Statement
// Write a C program that accepts an unknown number of integers from the user.
// Example:
// Enter number of elements: 6
// Enter elements:
// 12 7 25 7 40 12
// The program should:
// 1. Dynamically allocate memory for the elements.
// 2. Find the largest and smallest values.
// 3. Find all duplicate values.
// 4. Release all dynamically allocated memory.
// The program must use:
// • Dynamic memory allocation
// • Arrays and pointers
// • User-defined functions
// • Pointer arithmetic
// • Proper memory deallocation

#include <stdio.h>
#include <stdlib.h>

void largest(int *arr, int n)
{
    int *ptr = arr;

    int largest = *ptr, smallest = *ptr;
    for (int i = 0; i < n; i++)
    {

        if (*(ptr + i) > largest)
        {
            largest = *(ptr + i);
        }
        else if (*(ptr + i) < smallest)
            smallest = *(ptr + i);
    }
    printf("lagest :: %d\n", largest);
    printf("smallest :: %d\n", smallest);
}
void duplicate(int *arr, int n)
{
    int *ptr = arr;
    int i, j;

    for (i = 0; i < n; i++)
    {
        for (j = i + 1; j < n; j++)
        {
            if ((*ptr + i) == *(ptr + j))
                printf("%d ", *(ptr + i));
        }
    }
    printf("\n");
}

int main()
{
    int n;

    printf("Enter number of elements: ");
    scanf("%d", &n);

    /* Dynamic memory allocation */
    int *arr = malloc(n * sizeof(int));

    if (arr == NULL)
    {
        printf("Memory allocation failed\n");
        return 1;
    }

    printf("Enter elements:\n");

    for (int i = 0; i < n; i++)
    {
        scanf("%d", arr + i);
    }

    largest(arr, n);
    duplicate(arr, n);

    free(arr);
    arr = NULL;

    return 0;
}