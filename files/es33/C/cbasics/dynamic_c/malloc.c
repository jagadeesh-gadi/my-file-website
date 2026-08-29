// #include <stdio.h>
// #include <stdlib.h>

// int main()
// {

//     int n;
//     scanf("%d", &n);

//     int *p = malloc(n * sizeof(int));

//     // verify the allocation
//     if (p == NULL)
//     {
//         printf("memroy allocation was failed \n");
//         exit(1);
//     }

//     // access only with allocated memory
//     for (int i = 0; i < n; i++)
//     {
//         p[i] = i * 10;
//     }
//     for (int i = 0; i < n; i++)
//     {
//         *(p + i) = i * 10;
//     }

//     // use the allocated memory
//     for (int i = 0; i < n; i++)
//     {
//         printf("%d\n", p[i]);
//     }
//     // release memory
//     free(p);
//     // avoid the dynamic pointer
//     p = NULL;
//     return 0;
// }

#include <stdio.h>
#include <stdlib.h>

int main()
{
    int *p = malloc(5 * sizeof(int));

    for (int i = 0; i <= 5; i++)
    {
        p[i] = 10;
    }

    free(p);

    return 0;
}