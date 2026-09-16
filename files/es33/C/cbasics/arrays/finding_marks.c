#include <stdio.h>

void search(int arr[], int n, int key)
{
    int highest = arr[0];
    int lowest = arr[0];
    int index = -1;

    for (int i = 0; i < n; i++)
    {
        if (arr[i] > highest)
        {
            highest = arr[i];
        }
        else if (lowest < arr[i])
        {
            lowest = arr[i];
        }
        if (arr[i] == key && index == -1)
        {
            index = i;
        }
    }
    printf("highest values is :: %d\n", highest);
    printf("lowest  values is :: %d\n", lowest);

    if (index != -1)
    {
        printf("values is found %d :: %d \n", key, index);
    }
    else
    {
        printf("not found \n");
    }
}
void sort(int arr[], int n)
{
    int temp;
    for (int i = 0; i < n - 1; i++)
    {
        for (int j = i + 1; j < n; j++)
        {
            if (arr[i] > arr[j])
            {
                temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
}

int main()
{
    int n;
    int arr[n];
    printf("enter the size of array :: ");
    scanf("%d", &n);

    for (int i = 0; i < n; i++)
    {
        scanf("%d", &arr[i]);
    }

    printf("array values before are ::\n ");
    for (int i = 0; i < n; i++)
    {
        printf("%d ", arr[i]);
    }
    printf("\n");
    int key;

    printf("enter key value :: ");
    scanf("%d", &key);
    search(arr, n, key);

    sort(arr, n);
    printf("\n");
    printf("array values After sorting are ::\n ");
    for (int i = 0; i < n; i++)
    {
        printf("%d ", arr[i]);
    }
    printf("\n");
    return 0;
}
