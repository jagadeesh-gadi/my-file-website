#include <stdio.h>
#include <stdlib.h>

int main()
{
    int n;
    int new_n;
    int *temp;

    scanf("%d", &n);

    int *p = malloc(n * sizeof(int));

    if (p == NULL)
    {
        printf("Memory allocation failed\n");
        exit(1);
    }

    // Store values
    for (int i = 0; i < n; i++)
    {
        p[i] = i * 10;
    }

    printf("Original array:\n");

    for (int i = 0; i < n; i++)
    {
        printf("%d ", p[i]);
    }

    printf("\n");

    // New size
    printf("Enter new size: ");
    scanf("%d", &new_n);

    // Reallocate
    temp = realloc(p, new_n * sizeof(int));

    if (temp == NULL)
    {
        printf("Reallocation failed\n");
        free(p);
        return 1;
    }

    p = temp;

    // Initialize newly added elements
    if (new_n > n)
    {
        for (int i = n; i < new_n; i++)
        {
            p[i] = i * 10;
        }
    }

    printf("After realloc:\n");

    for (int i = 0; i < new_n; i++)
    {
        printf("%d ", p[i]);
    }

    printf("\n");

    free(p);
    p = NULL;

    return 0;
}