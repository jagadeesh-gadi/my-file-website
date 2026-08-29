#include <stdio.h>
#include <stdlib.h>

int main()
{
    int n;

    printf("Enter size: ");
    scanf("%d", &n);

    int *p = calloc(n, sizeof(int));

    if (p == NULL)
    {
        printf("Memory allocation failed\n");
        return 1;
    }

    printf("Initial values:\n");

    for (int i = 0; i < n; i++)
    {
        printf("%d ", p[i]);
    }

    printf("\n");

    printf("Enter values:\n");

    for (int i = 0; i < n; i++)
    {
        scanf("%d", &p[i]);
    }

    printf("Array values:\n");

    for (int i = 0; i < n; i++)
    {
        printf("%d ", p[i]);
    }
    printf("\n");

    free(p);
    p = NULL;

    return 0;
}