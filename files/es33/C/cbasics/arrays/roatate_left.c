// Rotate Array Left
// 10
// Then shift:
// 20 → position 0
// 30 → position 1
// 40 → position 2
// 50 → position 3
//
// Finally:
//
// 10 → position 4

#include <stdio.h>
void rotate(int *p, int n)
{

    int first = *p;
    for (int i = 0; i < n - 1; i++)
    {
        *(p + i) = *(p + i + 1);
    }
    *(p + n - 1) = first;
}

int main()
{
    int arr[] = {10, 20, 30, 40, 50};
    rotate(arr, 5);
    for (int i = 0; i < 5; i++)
    {
        printf("%d ", arr[i]);
    }
    printf("\n");
    return 0;
}