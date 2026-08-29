#include <stdio.h>

int main()
{
    int i, j, n = 5;
    int arr1[n], flag, k;
    for (i = 0; i < 5; i++)
    {
        scanf("%d", &arr1[i]);
    }
    for (i = 0; i < 5; i++)
    {
        flag = 0;
        for (j = 0; j < k; j++)
        {
            if (arr1[i] == arr1[j])
            {
                flag = 1;
                arr1[i];
                break;
            }
        }

        if (flag == 0)
        {
            arr1[k] = arr1[i];
            k++;
        }
    }
    printf("New size = %d\n", k);
    for (i = 0; i < k; i++)
    {
        printf("%d ", arr1[i]);
    }
    printf("\n");

    return 0;
}
