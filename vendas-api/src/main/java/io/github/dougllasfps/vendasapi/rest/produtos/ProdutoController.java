package io.github.dougllasfps.vendasapi.rest.produtos;

import io.github.dougllasfps.vendasapi.model.Produto;
import io.github.dougllasfps.vendasapi.model.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/produtos")
@CrossOrigin("*")
public class ProdutoController {

    @Autowired
    private ProdutoRepository repository;

    @GetMapping
    public List<ProdutoFormRequest> getLista(){
        return repository.findAll().stream()
                .map( ProdutoFormRequest::fromModel )
                .collect(Collectors.toList());
//        OUTRO JEITO
//        return repository.findAll().stream().map( new Function<Produto, ProdutoFormRequest>() {
//            @Override ProdutoFormRequest apply(Produto t){
//                return  ProdutoFormRequest.fromModel(t);
//            }
//        }).collect(Collectors.toList());
    }

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

    @GetMapping("{id}")
    public ResponseEntity<ProdutoFormRequest> getById(@PathVariable  Long id) {
         Optional<Produto> produtoExistente = repository.findById(id);

         if(produtoExistente.isEmpty()) return ResponseEntity.notFound().build();

         var produto = produtoExistente.map ( ProdutoFormRequest::fromModel ).get();

         return ResponseEntity.ok(produto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deletar(@PathVariable  Long id) {
        Optional<Produto> produtoExistente = repository.findById(id);

        if(produtoExistente.isEmpty()) return ResponseEntity.notFound().build();

        repository.delete(produtoExistente.get());

        return ResponseEntity.noContent().build();
    }

}
