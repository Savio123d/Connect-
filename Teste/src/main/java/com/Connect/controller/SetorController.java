// 6. Controller Setor (para expor a API)
package com.Connect.controller;

import com.Connect.dto.SetorDTO;
import com.Connect.service.SetorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/setores")
public class SetorController {

    private final SetorService setorService;

    public SetorController(SetorService setorService) {
        this.setorService = setorService;
    }

    @GetMapping
    public ResponseEntity<List<SetorDTO>> getAllSetores() {
        return ResponseEntity.ok(setorService.findAll());
    }

    @PostMapping
    public ResponseEntity<SetorDTO> createSetor(@RequestBody SetorDTO dto) {
        SetorDTO novoSetor = setorService.create(dto);
        URI location = URI.create("/api/setores/" + novoSetor.getId());
        return ResponseEntity.created(location).body(novoSetor);
    }
}