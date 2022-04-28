package io.github.dougllasfps.vendasapi.rest.produtos;

import io.github.dougllasfps.vendasapi.model.Produto;
import io.github.dougllasfps.vendasapi.model.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/produtos")
@CrossOrigin("*")
public class ProdutoController {

    @Autowired
    private ProdutoRepository repository;

    @PostMapping
    public ProdutoFormRequest salvar( @RequestBody ProdutoFormRequest produto){
        Produto entidadeProduto = produto.toModel();
        repository.save(entidadeProduto);
        return ProdutoFormRequest.fromModel(entidadeProduto);
    }
    @PutMapping("{id}")
    public ResponseEntity atualizar(@PathVariable Long id, @RequestBody ProdutoFormRequest produto) {
        Optional<Produto> produtoExistente = repository.findById(id);

        if(produtoExistente.isEmpty()) return ResponseEntity.notFound().build();

        Produto entidade = produto.toModel();
        entidade.setId(id);
        repository.save(entidade);

        return ResponseEntity.ok().build();
    }
}
